import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"; // STEP 1: Import dependencies
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { Document } from "@langchain/core/documents";
import { faqData } from "./faq-data";

// STEP 2: Global variable - stores the vector database, lazy initialization
// to hold instance of in-memory vector database storing document embeddings for
// fast, temporary retrieval. Starts as null, gets created on first use.
let vectorStore: MemoryVectorStore | null = null;

// STEP 3: Get or create vector store
export async function getVectorStore() {

    // If already created, return it immediately (fast path)
    if (vectorStore) {
        return vectorStore;
    }

    // Create embeddings model (converts text → vectors)
    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY!,
        modelName: "gemini-embedding-001",
    });

  // Transform FAQ data into LangChain Document format
  const documents = faqData.map((faq) => {

    // Combine question + answer into searchable text
    // This gives better search results than question alone
    const content = `Question: ${faq.question}\n\nAnswer: ${faq.answer}`;

    return new Document({
      pageContent: content,  // The text that gets converted to vector
      metadata: {            // Extra data we want to retrieve later
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        links: JSON.stringify(faq.links || []),  // Convert array to string
      },
    });
  });

  // Create vector store from documents
  // This sends all documents to Google API to get embeddings
  // Then stores them in memory for fast searching
  vectorStore = await MemoryVectorStore.fromDocuments(documents, embeddings);

  console.log("✅ Vector store ready!");
  
  return vectorStore;
}

// STEP 4: Search for similar FAQs
export async function searchFAQs(query: string, k: number = 3) {
    
    // Get the vector store (creates if first time)
    const store = await getVectorStore();

    // Search for K most similar documents
    // Internally: 
    //   1. Converts query to vector
    //   2. Compares to all FAQ vectors using cosine similarity
    //   3. Returns top K matches
    const results = await store.similaritySearch(query, k);

    // Extract and return just the data we need
    // Transform from LangChain Document format to our simple format
    return results.map(doc => ({
        question: doc.metadata.question,
        answer: doc.metadata.answer,
        category: doc.metadata.category,
        links: JSON.parse(doc.metadata.links || "[]"),  // Convert string back to array
    }));
}