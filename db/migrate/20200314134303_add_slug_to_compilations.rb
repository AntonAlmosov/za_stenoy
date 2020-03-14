class AddSlugToCompilations < ActiveRecord::Migration[6.0]
  def change
    add_column :compilations, :slug, :string
    add_index :compilations, :slug, unique: true
  end
end
