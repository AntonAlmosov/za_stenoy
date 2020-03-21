class CreateOfflineIssues < ActiveRecord::Migration[6.0]
  def change
    create_table :offline_issues do |t|
      t.string :title
      t.string :publish_date
      t.string :description
      t.integer :page_id
      t.string :purchase_link
      t.boolean :featured
      t.boolean :published

      t.timestamps
    end
  end
end
