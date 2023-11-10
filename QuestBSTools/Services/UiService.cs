using System;
using System.Threading.Tasks;
using Avalonia.Controls;
using Avalonia.Controls.ApplicationLifetimes;
using QuestBSTools.ViewModels;
using QuestBSTools.Views;
using Core;

namespace QuestBSTools.Services;

public class UiService
{
    private readonly Window _mainWindow;

    private readonly IClassicDesktopStyleApplicationLifetime _appLifetime;
    
    private LoadedViewModel _loadedViewModel;

    public bool Loaded { get; private set; } = false;
    public bool ADB { get; private set; } = false;

    public UiService(IClassicDesktopStyleApplicationLifetime appLifetime)
    {
        _appLifetime = appLifetime;
        _mainWindow = PrepareUI();
        
        _appLifetime.MainWindow = _mainWindow;

        CheckComponents();
    }

    private Window PrepareUI()
    {
        MainWindow window = new();
        
        MainWindowViewModel viewModel = new(new LoadingViewModel(this), new NoADBViewModel(), _loadedViewModel = new LoadedViewModel(), this);
        
        window.DataContext = viewModel;
        
        return window;
    }

    private async Task CheckComponents()
    {
        bool adb = await new StartupChecks().CheckADB();
        
        // log adb status
        Console.Out.WriteLine($"ADB: {adb}");
        
        if (adb)
        {
            this.ADB = true;
            this.Loaded = true;
            // refresh main window
            _appLifetime.MainWindow = PrepareUI();
        }
        
    }
}