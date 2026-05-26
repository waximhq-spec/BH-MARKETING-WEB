import { getProjects } from "@/lib/projects";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const projects = await getProjects();
    return Response.json(projects);
  } catch (error: any) {
    console.error('[API Projects] Error fetching projects:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
