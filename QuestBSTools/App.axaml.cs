using Avalonia;
using Avalonia.Controls.ApplicationLifetimes;
using Avalonia.Markup.Xaml;
using QuestBSTools.Services;
using QuestBSTools.ViewModels;
using QuestBSTools.Views;

namespace QuestBSTools;

public partial class App : Application
{
    public override void Initialize()
    {
        AvaloniaXamlLoader.Load(this);
    }

    public override void OnFrameworkInitializationCompleted()
    {
        if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
        {
            var uiService = new UiService(desktop);
        }

        base.OnFrameworkInitializationCompleted();
    }
}