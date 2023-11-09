using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;

namespace QuestBSTools.Views;

public partial class LoadingView : UserControl
{
    public LoadingView()
    {
        InitializeComponent();
#if DEBUG
        this.AttachDevTools();
#endif
    }

    private void InitializeComponent()
    {
        AvaloniaXamlLoader.Load(this);
    }
}