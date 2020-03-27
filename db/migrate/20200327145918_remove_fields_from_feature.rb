class RemoveFieldsFromFeature < ActiveRecord::Migration[6.0]
  def change

    remove_column :features, :title, :string

    remove_column :features, :url, :string

    remove_column :features, :publish_date, :string
  end
end
