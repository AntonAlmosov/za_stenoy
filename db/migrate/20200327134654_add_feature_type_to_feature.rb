class AddFeatureTypeToFeature < ActiveRecord::Migration[6.0]
  def change
    add_column :features, :feature_type, :string
    add_column :features, :origin_id, :integer
  end
end
