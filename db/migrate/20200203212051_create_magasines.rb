class CreateMagasines < ActiveRecord::Migration[6.0]
  def change
    create_table :magasines do |t|
      t.string :title
      t.string :description
      t.string :external_link

      t.timestamps
    end
  end
end
