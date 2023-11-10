using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;

namespace QuestBSTools.Views;

public partial class LoadedView : UserControl
{
    public LoadedView()
    {
        InitializeComponent();
    }

    private void InitializeComponent()
    {
        AvaloniaXamlLoader.Load(this);
    }
}