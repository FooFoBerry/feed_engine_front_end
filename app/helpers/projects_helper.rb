module ProjectsHelper
  def project_for_mustache(project)
    {
      :name => project['name'],
      :settings_image => 'cog.png',
      :display_image => 'publish.png'
    }
  end
end
