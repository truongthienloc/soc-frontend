.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x5 , x0 , 4 
		add     x9 , x0 , x0 
		add     x29 , x0 , x0 
		addi    x3 , x0 , 36 
		addi    x30 , x0 , 2 
InArr:
		addi    x22 , x0 , 12 
		addi    x31 , x0 , 12 
		addi    x17 , x0 , 4 
		addi    x20 , x0 , 72 
		sh      x22 , 16 (x3) 
		sh      x31 , 20 (x3) 
		sh      x17 , 24 (x3) 
		sh      x20 , 28 (x3) 
Loop:
		sll     x7 , x29 , x30 
		add     x2 , x7 , x3 
		lhu     x4 , 16 (x2) 
		add     x9 , x9 , x4 
		addi    x29 , x29 , 1 
		beq     x29 , x5 , Result 
		jal     x0 , Loop 
Result:
		addi    x6 , x0 , 100 
		bne     x6 , x9 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
