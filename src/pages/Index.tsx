import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [testStep, setTestStep] = useState(0);
  const [testAnswers, setTestAnswers] = useState<number[]>([]);
  const [testResult, setTestResult] = useState<string | null>(null);

  const testQuestions = [
    {
      question: 'Что для вас важнее в фотографии?',
      options: [
        { text: 'Точная передача реалистичных моментов', score: 1 },
        { text: 'Яркие эффекты и необычные образы', score: 3 },
        { text: 'Пока не решил(-а)', score: 2 }
      ]
    },
    {
      question: 'Какой способ съёмки вам больше нравится?',
      options: [
        { text: 'С помощью фотоаппарата и профессионального фотографа', score: 1 },
        { text: 'Использование технологий искусственного интеллекта и цифровых эффектов', score: 3 },
        { text: 'Готов экспериментировать с любыми вариантами', score: 2 }
      ]
    },
    {
      question: 'Как вы относитесь к времени обработки фотографий?',
      options: [
        { text: 'Хочу получить фото быстро, в течение одного-двух дней', score: 1 },
        { text: 'Могу подождать дольше ради качественной и творческой обработки', score: 3 },
        { text: 'Время не имеет значения', score: 2 }
      ]
    },
    {
      question: 'Насколько для вас важен личный контакт с фотографом?',
      options: [
        { text: 'Очень важен, хочу обсудить все детали лично', score: 1 },
        { text: 'Можно ограничиться онлайн общением', score: 3 },
        { text: 'Не принципиально', score: 2 }
      ]
    },
    {
      question: 'Какой результат для вас предпочтительнее?',
      options: [
        { text: 'Естественные снимки без сильной обработки', score: 1 },
        { text: 'Креативные изображения с использованием AI и других технологий', score: 3 },
        { text: 'Готов попробовать разные стили', score: 2 }
      ]
    }
  ];

  const handleTestAnswer = (score: number) => {
    const newAnswers = [...testAnswers, score];
    setTestAnswers(newAnswers);

    if (testStep < testQuestions.length - 1) {
      setTestStep(testStep + 1);
    } else {
      const totalScore = newAnswers.reduce((a, b) => a + b, 0);
      const avgScore = totalScore / newAnswers.length;
      
      if (avgScore <= 1.5) {
        setTestResult('classic');
      } else if (avgScore >= 2.5) {
        setTestResult('neuro');
      } else {
        setTestResult('both');
      }
    }
  };

  const resetTest = () => {
    setTestStep(0);
    setTestAnswers([]);
    setTestResult(null);
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-purple-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent">
              Alexandra & Maria
            </h1>
            <div className="hidden md:flex gap-8">
              {['home', 'about', 'portfolio', 'services', 'pricing', 'reviews', 'test', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'about' && 'О нас'}
                  {section === 'portfolio' && 'Портфолио'}
                  {section === 'services' && 'Услуги'}
                  {section === 'pricing' && 'Прайс'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'test' && 'Тест'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-800 to-black bg-clip-text text-transparent">
              Два взгляда на фотографию
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12">
              Классическая фотография и нейрофотография — выберите свой стиль
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" onClick={() => scrollToSection('test')}>
                <Icon name="Sparkles" className="mr-2" size={20} />
                Пройти тест
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => scrollToSection('portfolio')}>
                <Icon name="Image" className="mr-2" size={20} />
                Портфолио
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-white/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-scale-in border-purple-100">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/dbfe71aa-9202-425d-a59f-ebb9cd48247c/files/29c45cf4-a1c9-479b-9075-75c077a7c6fe.jpg" 
                  alt="Maria Photography" 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-3xl">Мария — Классическая фотография</CardTitle>
                <CardDescription className="text-lg">г. Новосибирск</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Профессиональный фотограф с опытом работы более 8 лет. Специализируюсь на портретной, семейной и свадебной фотографии. Работаю в Новосибирске, создавая живые эмоциональные снимки, которые сохранят ваши счастливые моменты навсегда.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary"><Icon name="Camera" size={14} className="mr-1" />Портреты</Badge>
                  <Badge variant="secondary"><Icon name="Users" size={14} className="mr-1" />Семейные</Badge>
                  <Badge variant="secondary"><Icon name="Heart" size={14} className="mr-1" />Свадьбы</Badge>
                  <Badge variant="secondary"><Icon name="MapPin" size={14} className="mr-1" />Новосибирск</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-scale-in border-purple-100">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/dbfe71aa-9202-425d-a59f-ebb9cd48247c/files/6ddc559b-8bb2-40b0-a1b9-809beccde798.jpg" 
                  alt="Alexandra Neuro Photography" 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-3xl">Александра — Нейрофотография</CardTitle>
                <CardDescription className="text-lg">Работаю онлайн</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Нейрофотограф, работающий с искусственным интеллектом и передовыми технологиями. Создаю уникальные художественные портреты с использованием AI. Работаю онлайн со всем миром, превращая ваши идеи в невероятные визуальные образы.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary"><Icon name="Sparkles" size={14} className="mr-1" />AI-портреты</Badge>
                  <Badge variant="secondary"><Icon name="Palette" size={14} className="mr-1" />Арт-обработка</Badge>
                  <Badge variant="secondary"><Icon name="Zap" size={14} className="mr-1" />Нейросети</Badge>
                  <Badge variant="secondary"><Icon name="Globe" size={14} className="mr-1" />Онлайн</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-black bg-clip-text text-transparent">
            Портфолио
          </h2>
          <Tabs defaultValue="maria" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="maria">Мария</TabsTrigger>
              <TabsTrigger value="alexandra">Александра</TabsTrigger>
            </TabsList>
            <TabsContent value="maria" className="animate-fade-in">
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <img 
                      src="https://cdn.poehali.dev/projects/dbfe71aa-9202-425d-a59f-ebb9cd48247c/files/8f88ee40-5226-411f-97be-ad65d8e98b66.jpg" 
                      alt={`Portfolio ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="alexandra" className="animate-fade-in">
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <img 
                      src="https://cdn.poehali.dev/projects/dbfe71aa-9202-425d-a59f-ebb9cd48247c/files/6ddc559b-8bb2-40b0-a1b9-809beccde798.jpg" 
                      alt={`Portfolio ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="services" className="py-20 px-6 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-black bg-clip-text text-transparent">
            Сравнение форматов съёмки
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Camera" className="text-primary" />
                  Классическая фотография
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-2">
                    <Icon name="Plus" size={18} />
                    Плюсы:
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Реалистичная передача эмоций и моментов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Личный контакт с фотографом</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Естественное освещение и композиция</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Проверенная временем техника</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                    <Icon name="Minus" size={18} />
                    Минусы:
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Требуется личное присутствие</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Привязка к локации (Новосибирск)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Зависимость от погоды (для outdoor)</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Sparkles" className="text-primary" />
                  Нейрофотография
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-2">
                    <Icon name="Plus" size={18} />
                    Плюсы:
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Безграничные творческие возможности</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Работа онлайн из любой точки мира</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Уникальные эффекты и стилизации</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-1" />
                      <span>Быстрая обработка с помощью AI</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                    <Icon name="Minus" size={18} />
                    Минусы:
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Меньше реализма, больше художественности</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Требуются исходные фото для обработки</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="X" size={16} className="text-red-500 mt-1" />
                      <span>Новая технология, не всем привычна</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-black bg-clip-text text-transparent">
            Прайс
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-purple-200 hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl">Классическая фотография</CardTitle>
                <CardDescription>Мария, г. Новосибирск</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span>Портретная съёмка (1 час)</span>
                  <span className="font-bold">от 5 000 ₽</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span>Семейная фотосессия (2 часа)</span>
                  <span className="font-bold">от 8 000 ₽</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span>Свадебная съёмка (полный день)</span>
                  <span className="font-bold">от 25 000 ₽</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span>Love Story (2 часа)</span>
                  <span className="font-bold">от 7 000 ₽</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">* Включает обработку 30-50 фото в течение 7 дней</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl">Нейрофотография</CardTitle>
                <CardDescription>Александра, онлайн</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span>AI-портрет (5 вариантов)</span>
                  <span className="font-bold">от 3 000 ₽</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span>Художественная обработка (10 фото)</span>
                  <span className="font-bold">от 5 000 ₽</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span>Полный нейро-образ (20 фото)</span>
                  <span className="font-bold">от 10 000 ₽</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span>Концептуальная серия (30 фото)</span>
                  <span className="font-bold">от 15 000 ₽</span>
                </div>
                <p className="text-sm text-gray-500 mt-4">* Работа с вашими фото, обработка 3-5 дней</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-6 bg-white/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-black bg-clip-text text-transparent">
            Отзывы
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Анна К.', service: 'Классическая съёмка', text: 'Мария — настоящий профессионал! Фотосессия прошла легко и непринуждённо. Результат превзошёл все ожидания. Рекомендую!', rating: 5 },
              { name: 'Дмитрий С.', service: 'Нейрофотография', text: 'Александра создала невероятные AI-портреты! Такого я нигде не видел. Это действительно искусство будущего.', rating: 5 },
              { name: 'Елена М.', service: 'Семейная фотосессия', text: 'Замечательная работа Марии! Она смогла раскрыть всех членов семьи, фотографии получились живыми и искренними.', rating: 5 },
              { name: 'Игорь Л.', service: 'Нейро-образ', text: 'Работа с Александрой онлайн оказалась очень удобной. Результат поразил — фото выглядят как из фантастического фильма!', rating: 5 }
            ].map((review, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{review.name}</CardTitle>
                      <CardDescription>{review.service}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="test" className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-black bg-clip-text text-transparent">
            Какая съёмка вам подойдёт?
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Пройдите тест и узнайте, какой формат фотографии подходит именно вам
          </p>

          <Card className="border-2 border-purple-200">
            <CardContent className="pt-6">
              {testResult === null ? (
                <div className="space-y-6">
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Вопрос {testStep + 1} из {testQuestions.length}</span>
                      <span className="text-sm text-gray-500">{Math.round(((testStep) / testQuestions.length) * 100)}%</span>
                    </div>
                    <Progress value={(testStep / testQuestions.length) * 100} className="h-2" />
                  </div>

                  <h3 className="text-xl font-semibold mb-6">{testQuestions[testStep].question}</h3>

                  <RadioGroup className="space-y-4">
                    {testQuestions[testStep].options.map((option, i) => (
                      <div key={i} className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-primary transition-colors cursor-pointer">
                        <RadioGroupItem value={i.toString()} id={`option-${i}`} onClick={() => handleTestAnswer(option.score)} />
                        <Label htmlFor={`option-${i}`} className="flex-1 cursor-pointer text-base">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ) : (
                <div className="text-center space-y-6 animate-fade-in">
                  <Icon name="CheckCircle" size={64} className="mx-auto text-primary" />
                  <h3 className="text-2xl font-bold">Результаты теста</h3>
                  
                  {testResult === 'classic' && (
                    <div className="space-y-4">
                      <p className="text-lg">Вам идеально подойдёт <strong className="text-primary">классическая фотография</strong> с Марией!</p>
                      <p className="text-gray-600">
                        Вы цените реализм, живые эмоции и личный контакт. Традиционная фотосессия с профессиональным фотографом — ваш выбор.
                      </p>
                      <Button size="lg" onClick={() => scrollToSection('contacts')}>
                        <Icon name="Camera" className="mr-2" />
                        Связаться с Марией
                      </Button>
                    </div>
                  )}

                  {testResult === 'neuro' && (
                    <div className="space-y-4">
                      <p className="text-lg">Вам идеально подойдёт <strong className="text-primary">нейрофотография</strong> с Александрой!</p>
                      <p className="text-gray-600">
                        Вы открыты новым технологиям и креативу. AI-обработка и художественные эффекты помогут создать уникальные образы.
                      </p>
                      <Button size="lg" onClick={() => scrollToSection('contacts')}>
                        <Icon name="Sparkles" className="mr-2" />
                        Связаться с Александрой
                      </Button>
                    </div>
                  )}

                  {testResult === 'both' && (
                    <div className="space-y-4">
                      <p className="text-lg">Вам подойдут <strong className="text-primary">оба формата</strong> съёмки!</p>
                      <p className="text-gray-600">
                        Вы открыты экспериментам и готовы попробовать разные стили. Рекомендуем начать с классической фотосессии, а затем дополнить её нейрообработкой.
                      </p>
                      <div className="flex gap-4 justify-center flex-wrap">
                        <Button size="lg" onClick={() => scrollToSection('contacts')}>
                          <Icon name="Users" className="mr-2" />
                          Связаться с обеими
                        </Button>
                      </div>
                    </div>
                  )}

                  <Button variant="outline" onClick={resetTest} className="mt-4">
                    <Icon name="RotateCcw" className="mr-2" />
                    Пройти тест заново
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contacts" className="py-20 px-6 bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-black bg-clip-text text-transparent">
            Контакты
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl">Мария</CardTitle>
                <CardDescription>Классическая фотография</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" className="text-primary" />
                  <span>г. Новосибирск</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Phone" className="text-primary" />
                  <span>+7 (923) 123-45-67</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" className="text-primary" />
                  <span>maria.photo@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Instagram" className="text-primary" />
                  <span>@maria_photo_nsk</span>
                </div>
                <Button className="w-full mt-4" size="lg">
                  <Icon name="MessageCircle" className="mr-2" />
                  Написать в WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl">Александра</CardTitle>
                <CardDescription>Нейрофотография</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Globe" className="text-primary" />
                  <span>Работаю онлайн</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Phone" className="text-primary" />
                  <span>+7 (999) 888-77-66</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" className="text-primary" />
                  <span>alexandra.neuro@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Instagram" className="text-primary" />
                  <span>@alexandra_neuro_art</span>
                </div>
                <Button className="w-full mt-4" size="lg">
                  <Icon name="Send" className="mr-2" />
                  Написать в Telegram
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-12 px-6">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Alexandra & Maria
          </h3>
          <p className="text-gray-400 mb-4">Два взгляда на фотографию — выберите свой стиль</p>
          <div className="flex justify-center gap-6 mb-6">
            <Icon name="Instagram" className="cursor-pointer hover:text-primary transition-colors" />
            <Icon name="Facebook" className="cursor-pointer hover:text-primary transition-colors" />
            <Icon name="Youtube" className="cursor-pointer hover:text-primary transition-colors" />
          </div>
          <p className="text-sm text-gray-500">© 2024 Alexandra & Maria. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
