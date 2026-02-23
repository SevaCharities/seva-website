import { Resend } from "resend";
import { NextResponse } from "next/server";

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildFullLink(siteUrl: string, link?: string) {
  if (!link) return undefined;
  if (link.startsWith("http")) return link;

  const normalizedSite = siteUrl.endsWith("/")
    ? siteUrl.slice(0, -1)
    : siteUrl;

  const normalizedLink = link.startsWith("/") ? link : `/${link}`;
  return `${normalizedSite}${normalizedLink}`;
}

function emailTemplate({
  subject,
  message,
  fullLink,
  siteUrl,
}: {
  subject: string;
  message: string;
  fullLink?: string;
  siteUrl: string;
}) {
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br/>");
  const safeSiteUrl = escapeHtml(siteUrl);
  const safeFullLink = fullLink ? escapeHtml(fullLink) : undefined;

  const BRAND_NAME = "Seva Charities";
  const ACCENT = "#F4A23A";
  const LOGO_URL = "https://sevacharities.com/seva_logo.png";

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#fff7ed;">
    <div style="display:none;max-height:0;overflow:hidden;">
      A quick update from ${BRAND_NAME}
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff7ed;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;">

            <!-- Header -->
            <tr>
              <td style="padding-bottom:14px;">
                <table width="100%">
                  <tr>
                    <td style="vertical-align:middle;">
                      <img src="${LOGO_URL}" width="36" height="36" 
                        style="border-radius:10px;vertical-align:middle;" />
                      <span style="font-family:Arial;font-weight:800;
                                   font-size:16px;margin-left:10px;">
                        ${BRAND_NAME}
                      </span>
                    </td>
                    <td align="right" style="font-family:Arial;font-size:12px;">
                      <a href="${safeSiteUrl}" style="color:${ACCENT};
                        text-decoration:none;font-weight:700;">
                        sevacharities.com
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Card -->
            <tr>
              <td style="background:#ffffff;border-radius:16px;
                         border:1px solid #fde68a;overflow:hidden;">
                <div style="background:${ACCENT};height:6px;"></div>

                <div style="padding:22px;font-family:Arial;">
                  <h2 style="margin:0 0 12px 0;color:#111827;">
                    ${safeSubject}
                  </h2>

                  <p style="color:#374151;line-height:1.7;">
                    ${safeMessage}
                  </p>

                  ${
                    fullLink
                      ? `<div style="margin-top:20px;">
                          <a href="${safeFullLink}"
                             style="background:${ACCENT};
                                    color:#111827;
                                    padding:12px 18px;
                                    border-radius:12px;
                                    text-decoration:none;
                                    font-weight:700;">
                            View details
                          </a>
                        </div>`
                      : ""
                  }
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding-top:16px;text-align:center;
                         font-family:Arial;font-size:12px;color:#6b7280;">
                You're receiving this because you're a member of ${BRAND_NAME}.<br/>
                <a href="${safeSiteUrl}/profile"
                   style="color:${ACCENT};text-decoration:none;font-weight:700;">
                   Manage preferences
                </a>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function emailText({
  subject,
  message,
  fullLink,
  siteUrl,
}: {
  subject: string;
  message: string;
  fullLink?: string;
  siteUrl: string;
}) {
  return `Seva Charities

${subject}

${message}

${fullLink ? `View details: ${fullLink}` : ""}

Manage preferences: ${siteUrl}/profile
`;
}

export async function POST(request: Request) {
  try {
    const { to, subject, message, link } = await request.json();

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const fullLink = buildFullLink(siteUrl, link);

    const html = emailTemplate({
      subject,
      message,
      fullLink,
      siteUrl,
    });

    const text = emailText({
      subject,
      message,
      fullLink,
      siteUrl,
    });

    const { error } = await resend.emails.send({
      from: "Seva Charities <no-reply@sevacharities.com>",
      replyTo: "sevacharities@gmail.com",
      to: [to],
      subject,
      html,
      text,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}