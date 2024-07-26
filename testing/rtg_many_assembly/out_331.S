.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x19 , x0 , 4 
		add     x8 , x0 , x0 
		add     x18 , x0 , x0 
		addi    x9 , x0 , 48 
		addi    x25 , x0 , 2 
InArr:
		addi    x7 , x0 , 4 
		addi    x28 , x0 , 64 
		addi    x14 , x0 , 28 
		addi    x10 , x0 , 40 
		sh      x7 , 36 (x9) 
		sh      x28 , 40 (x9) 
		sh      x14 , 44 (x9) 
		sh      x10 , 48 (x9) 
Loop:
		sll     x20 , x18 , x25 
		add     x21 , x20 , x9 
		lhu     x6 , 36 (x21) 
		add     x8 , x8 , x6 
		addi    x18 , x18 , 1 
		beq     x18 , x19 , Result 
		jal     x0 , Loop 
Result:
		addi    x12 , x0 , 136 
		bne     x12 , x8 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
