import { execSync } from "child_process";

const TOKEN = process.env.VERCEL_TOKEN || "vcp_4qz3PrA9jzfNskhQDTpNnFJC0kRVNoQP9ze3e6aLakrC7p2oAD1HHTgC";
const TEAM_ID = "team_0nfmu6CYlt282HsXpJbdRirN";
const PROJECT_ID = "prj_XaUdfJ71RsK6f7S6rf2T4PAQeF1K";
const PROJECT_NAME = "katayayani-site";
const REPO_ID = "1277918660";

async function deploy() {
  const sha = execSync("git rev-parse HEAD").toString().trim();
  const commitMsg = execSync("git log -1 --pretty=%B").toString().trim();
  console.log(`🚀 Triggering production deployment for commit ${sha.slice(0, 7)}...`);

  const res = await fetch(`https://api.vercel.com/v13/deployments?teamId=${TEAM_ID}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: PROJECT_NAME,
      project: PROJECT_ID,
      gitSource: {
        type: "github",
        repoId: REPO_ID,
        ref: "main",
        sha,
      },
      target: "production",
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("❌ Deployment failed to initiate:", data);
    process.exit(1);
  }

  const deploymentId = data.id;
  console.log(`📦 Deployment initiated: ${deploymentId} (${data.url})`);
  console.log("⏳ Building on Vercel...");

  let readyState = data.readyState;
  while (readyState !== "READY" && readyState !== "ERROR" && readyState !== "CANCELED") {
    await new Promise((r) => setTimeout(r, 4000));
    const pollRes = await fetch(`https://api.vercel.com/v13/deployments/${deploymentId}?teamId=${TEAM_ID}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const pollData = await pollRes.json();
    readyState = pollData.readyState;
    process.stdout.write(`... state: ${readyState}\n`);
  }

  if (readyState === "READY") {
    console.log("🎉 Successfully deployed to production!");
    console.log("🌐 Live URLs: https://www.katayayanienterprises.online");
  } else {
    console.error(`❌ Build ended with state: ${readyState}`);
    process.exit(1);
  }
}

deploy().catch((err) => {
  console.error(err);
  process.exit(1);
});
