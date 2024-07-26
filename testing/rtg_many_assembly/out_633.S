.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x31 , x0 , 4 
		add     x27 , x0 , x0 
		add     x10 , x0 , x0 
		addi    x1 , x0 , 68 
		addi    x18 , x0 , 2 
InArr:
		addi    x30 , x0 , 32 
		addi    x13 , x0 , 56 
		addi    x14 , x0 , 76 
		addi    x2 , x0 , 40 
		sh      x30 , 20 (x1) 
		sh      x13 , 24 (x1) 
		sh      x14 , 28 (x1) 
		sh      x2 , 32 (x1) 
Loop:
		sll     x8 , x10 , x18 
		add     x28 , x8 , x1 
		lhu     x9 , 20 (x28) 
		add     x27 , x27 , x9 
		addi    x10 , x10 , 1 
		beq     x10 , x31 , Result 
		jal     x0 , Loop 
Result:
		addi    x3 , x0 , 204 
		bne     x3 , x27 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
