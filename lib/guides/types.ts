export type GuideMaterial = {
  name: string;
  quantity: string;
  product_url?: string;
};

export type GuideTool = {
  name: string;
  quantity?: string;
  product_url?: string;
};

export type GuideStep = {
  title: string;
  estimatedTime: string;
  instructions: string;
  materials: string[];
  tools: string[];
  image_path?: string | null;
};

export type GuideRow = {
  id: string;
  title: string;
  slug: string;
  overview: string;
  hero_image_path: string | null;
  materials: GuideMaterial[];
  tools: GuideTool[];
  steps: GuideStep[];
  viz_reference_image_path: string | null;
  viz_question_2: string | null;
  viz_question_3: string | null;
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export const GUIDE_IMAGES_BUCKET = "guide-images";

export const GLOBAL_VIZ_QUESTION_1 =
  "How would you like this project implemented in your space?";
