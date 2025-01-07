.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x20 , x0 , 4 
		add     x3 , x0 , x0 
		add     x1 , x0 , x0 
		addi    x21 , x0 , 40 
		addi    x5 , x0 , 2 
InArr:
		addi    x27 , x0 , 76 
		addi    x28 , x0 , 24 
		addi    x30 , x0 , 72 
		addi    x2 , x0 , 48 
		sh      x27 , 16 (x21) 
		sh      x28 , 20 (x21) 
		sh      x30 , 24 (x21) 
		sh      x2 , 28 (x21) 
Loop:
		sll     x10 , x1 , x5 
		add     x24 , x10 , x21 
		lhu     x11 , 16 (x24) 
		add     x3 , x3 , x11 
		addi    x1 , x1 , 1 
		beq     x1 , x20 , Result 
		jal     x0 , Loop 
Result:
		addi    x6 , x0 , 220 
		bne     x6 , x3 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
