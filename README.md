This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Chair Setup

Clone the repo:

git clone https://github.com/SevaCharities/seva-website.git
cd seva-website

Grab all branches and switch to yours:

git fetch origin
git checkout visvesh
git pull

After this, you should always see you're on visvesh when you run:

git branch

## Your Normal Workflow

Whenever you’re working, make your changes, stage them (. for all files or just whichever file u worked on is good), commit, push:

git add .
git commit -m "Short description of what you did"
git push

That’s it. Everything stays on your branch.

When you’re ready for review when a feature or fix is done, go to the repo on GitHub, and click “Compare & pull request”. 
Make sure it says:

base: master
compare: visvesh

Add a quick summary of what you did, open the PR, and I’ll review it and merge it if everything looks good.
Pretty chill, just don’t work on master, and stay on the visvesh branch so we can isolate work and I could review after pushes.

## If Master Gets Updated

If I merge something and you need the latest changes:

git checkout master
git pull origin master

git checkout visvesh
git merge master
git push

That keeps you in sync.
