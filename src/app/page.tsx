import { getAllTechStacks } from '@/lib/mdx';
import { mdxToTechStack } from '@/types/mdx-tech-stack';
import { TechStackClientPage } from '@/components/tech-stack-client-page';

export default async function Home() {
  try {
    // Get MDX tech stacks and convert them to the expected format
    const mdxTechStacks = getAllTechStacks();
    const techStacks = mdxTechStacks.map(mdxToTechStack);

    return <TechStackClientPage techStacks={techStacks} />;
  } catch (error) {
    console.error('Error loading tech stacks:', error);
    // Return empty state or error state
    return <TechStackClientPage techStacks={[]} />;
  }
}
