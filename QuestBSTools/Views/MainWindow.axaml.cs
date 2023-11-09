using Avalonia;
using Avalonia.Controls;
using Avalonia.Controls.Primitives;

namespace QuestBSTools.Views;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
#if DEBUG
        this.AttachDevTools();
#endif
    }
    
    protected override void OnApplyTemplate(TemplateAppliedEventArgs e)
    {
        base.OnApplyTemplate(e);
        ExtendClientAreaChromeHints =
            Avalonia.Platform.ExtendClientAreaChromeHints.PreferSystemChrome |
            Avalonia.Platform.ExtendClientAreaChromeHints.OSXThickTitleBar;
    }
}