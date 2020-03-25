class CreateFeatures < ActiveRecord::Migration[6.0]
  def change
    create_table :features do |t|
      t.string :title
      t.string :publish_date
      t.string :url

      t.timestamps
    end
  end
end
