class CreatePageFeatures < ActiveRecord::Migration[6.0]
  def change
    create_table :page_features do |t|
      t.string :feature_type
      t.integer :origin_id

      t.timestamps
    end
  end
end
