class CreateNewsImages < ActiveRecord::Migration[6.0]
  def change
    create_table :news_images do |t|

      t.timestamps
    end
  end
end
