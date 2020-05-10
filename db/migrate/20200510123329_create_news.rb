class CreateNews < ActiveRecord::Migration[6.0]
  def change
    create_table :news do |t|
      t.string :title
      t.text :text
      t.text :caption
      t.integer :page_id
      t.boolean :published
      t.boolean :featured

      t.timestamps
    end
  end
end
