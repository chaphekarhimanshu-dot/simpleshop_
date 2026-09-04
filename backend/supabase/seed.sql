-- Sample data so the shop isn't empty on first run.
-- Run this AFTER 001_initial_schema.sql, in the Supabase SQL editor.

INSERT INTO public.categories (name, slug) VALUES
  ('Bags', 'bags'),
  ('Home', 'home'),
  ('Accessories', 'accessories');

-- Grab category ids so products can reference them
DO $$
DECLARE
  bags_id UUID;
  home_id UUID;
  accessories_id UUID;
BEGIN
  SELECT id INTO bags_id FROM public.categories WHERE slug = 'bags';
  SELECT id INTO home_id FROM public.categories WHERE slug = 'home';
  SELECT id INTO accessories_id FROM public.categories WHERE slug = 'accessories';

  INSERT INTO public.products (category_id, name, description, price, image_url, stock_quantity) VALUES
    (bags_id, 'Canvas Tote', 'A sturdy everyday tote made from heavyweight canvas.', 34.00, 'https://placehold.co/600x600?text=Canvas+Tote', 25),
    (bags_id, 'Leather Backpack', 'Minimal leather backpack with a padded laptop sleeve.', 89.00, 'https://placehold.co/600x600?text=Leather+Backpack', 12),
    (home_id, 'Ceramic Mug', 'Hand-glazed ceramic mug, holds 350ml.', 14.00, 'https://placehold.co/600x600?text=Ceramic+Mug', 40),
    (home_id, 'Linen Cushion Cover', 'Soft linen cushion cover, 45x45cm.', 22.00, 'https://placehold.co/600x600?text=Cushion+Cover', 30),
    (home_id, 'Oak Coasters (Set of 4)', 'Solid oak coasters with a natural finish.', 18.00, 'https://placehold.co/600x600?text=Oak+Coasters', 20),
    (accessories_id, 'Wool Beanie', 'Warm merino wool beanie, one size.', 24.00, 'https://placehold.co/600x600?text=Wool+Beanie', 35),
    (accessories_id, 'Leather Wallet', 'Slim bifold wallet in full-grain leather.', 42.00, 'https://placehold.co/600x600?text=Leather+Wallet', 18),
    (accessories_id, 'Sunglasses', 'Polarized sunglasses with acetate frames.', 55.00, 'https://placehold.co/600x600?text=Sunglasses', 15);
END $$;