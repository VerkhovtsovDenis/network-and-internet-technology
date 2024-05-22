#include <iostream>
#include <vector>
#include <algorithm>

template<typename T>
class MyVector : public std::vector<T> {
public:
    MyVector(std::initializer_list<T> init) : std::vector<T>(init) {}

    // Метод для выполнения операции сложения с числом a
    void add(T a) {
        for (auto& val : *this) {
            val += a;
        }
    }

    // Метод для выполнения операции умножения на число a
    void multiply(T a) {
        for (auto& val : *this) {
            val *= a;
        }
    }

    // Расчет скалярного произведения с другим вектором
    T scalar_product(const MyVector<T>& other) const {
        T result = 0;
        for (size_t i = 0; i < this->size(); ++i) {
            result += (*this)[i] * other[i];
        }
        return result;
    }


};

int main() {
    MyVector<int> vec = {1, 2, 3, 4, 5};
    vec.multiply(2);

    // Выводим результат
    for (int val : vec) {
        std::cout << val << " ";
    }
    std::cout << std::endl;

    // Пример для описания взаимодействия между объектами
    MyVector<int> vec1 {1, 2, 3};
    MyVector<int> vec2 {4, 5, 6};

    // Вычисляем скалярное произведение двух векторов
    int scalar_result = vec1.scalar_product(vec2);

    // Выводим результат
    std::cout << "Скалярное произведение: " << scalar_result << std::endl;



    return 0;
}


