class CreatePieces < ActiveRecord::Migration[6.0]
  def change
    create_table :pieces do |t|
      t.string :title
      t.text :text
      t.string :publish_date

      t.timestamps
    end
  end
end
