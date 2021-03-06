class CreateCompilations < ActiveRecord::Migration[6.0]
  def change
    create_table :compilations do |t|
      t.string :title
      t.text :caption
      t.integer :page_id
      t.boolean :published
      t.boolean :featured

      t.timestamps
    end
  end
end
