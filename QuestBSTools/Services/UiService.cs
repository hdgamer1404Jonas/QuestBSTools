using Avalonia.Controls;
using Avalonia.Controls.ApplicationLifetimes;
using QuestBSTools.ViewModels;
using QuestBSTools.Views;

namespace QuestBSTools.Services;

public class UiService
{
    private readonly Window _mainWindow;

    private readonly IClassicDesktopStyleApplicationLifetime _appLifetime;

    public string LoadingText { get; private set; } = "Loading...";
    public bool Loaded { get; private set; } = false;

    public UiService(IClassicDesktopStyleApplicationLifetime appLifetime)
    {
        _appLifetime = appLifetime;
        _mainWindow = PrepareUI();
        
        _appLifetime.MainWindow = _mainWindow;
    }

    private Window PrepareUI()
    {
        MainWindow window = new();
        
        MainWindowViewModel viewModel = new(new LoadingViewModel(this), this);
        
        window.DataContext = viewModel;
        
        return window;
    }
}