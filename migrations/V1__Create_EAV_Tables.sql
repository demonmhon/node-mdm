-- 1. Collections (e.g., "Car Brands", "Provinces")
CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    key VARCHAR(255) NOT NULL UNIQUE, -- Use this for API lookups (e.g., 'car-brands')
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Attributes (Metadata definition for each collection)
CREATE TABLE attributes (
    id SERIAL PRIMARY KEY,
    collection_id INTEGER REFERENCES collections(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key VARCHAR(255) NOT NULL,  -- The key used inside the JSONB object
    type VARCHAR(50) NOT NULL,  -- 'string', 'number', 'boolean', 'date', 'dateTime'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (collection_id, key) -- FIXED: Attribute keys must be unique WITHIN a collection
);

-- 3. Collection Items (The actual data)
CREATE TABLE collection_items (
    id SERIAL PRIMARY KEY,
    collection_id INTEGER REFERENCES collections(id) ON DELETE CASCADE,
    json_data JSONB NOT NULL, -- Stores the actual master data based on attributes
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Index for performance
CREATE INDEX idx_collection_items_json_data ON collection_items USING GIN (json_data);
CREATE INDEX idx_collection_items_collection_id ON collection_items (collection_id);

-- 5.1 Sample data: Collection
INSERT INTO collections (name, key, description) VALUES 
('Car Brands', 'car-brands', 'List of automotive manufacturers');

-- 5.2 Sample data: Attributes for "Car Brands"
INSERT INTO attributes (collection_id, name, key, type) VALUES 
((SELECT id FROM collections WHERE key = 'car-brands'), 'Brand Name', 'brand_name', 'string'),
((SELECT id FROM collections WHERE key = 'car-brands'), 'Country of Origin', 'country', 'string');

-- 5.3 Sample data: Collection Items for "Car Brands"
INSERT INTO collection_items (collection_id, json_data) VALUES 
((SELECT id FROM collections WHERE key = 'car-brands'), '{"brand_name": "Toyota", "country": "Japan"}'),
((SELECT id FROM collections WHERE key = 'car-brands'), '{"brand_name": "Ford", "country": "USA"}'),
((SELECT id FROM collections WHERE key = 'car-brands'), '{"brand_name": "BMW", "country": "Germany"}');