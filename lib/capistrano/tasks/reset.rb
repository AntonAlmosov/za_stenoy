task :reset do
  puts "\n=== Seeding Database ===\n"
  on primary :db do
   within current_path do
     with rails_env: fetch(:stage) do
       execute :rake, 'db:drop'
       execute :rake, 'db:create'
       execute :rake, 'db:migrate'
       execute :rake, 'db:seed'
     end
   end
  end
 end