class CreateOnlineIssues < ActiveRecord::Migration[6.0]
  def change
    create_table :online_issues do |t|
      t.string :title
      t.string :description_heading
      t.text :description 
      t.integer :page_id
      t.boolean :featured
      t.boolean :published

      t.timestamps
    end
  end
end
