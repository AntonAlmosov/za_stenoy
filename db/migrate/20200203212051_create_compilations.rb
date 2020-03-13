class CreateCompilations < ActiveRecord::Migration[6.0]
  def change
    create_table :compilation do |t|
      t.string :title
      t.text :caption
      t.integer :page_id

      t.timestamps
    end
  end
end
