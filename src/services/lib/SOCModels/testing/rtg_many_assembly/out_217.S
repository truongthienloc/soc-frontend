.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x12 , x0 , 4 
		add     x26 , x0 , x0 
		add     x15 , x0 , x0 
		addi    x31 , x0 , 24 
		addi    x6 , x0 , 2 
InArr:
		addi    x21 , x0 , 0 
		addi    x18 , x0 , 52 
		addi    x4 , x0 , 24 
		addi    x23 , x0 , 12 
		sh      x21 , 60 (x31) 
		sh      x18 , 64 (x31) 
		sh      x4 , 68 (x31) 
		sh      x23 , 72 (x31) 
Loop:
		sll     x9 , x15 , x6 
		add     x10 , x9 , x31 
		lhu     x7 , 60 (x10) 
		add     x26 , x26 , x7 
		addi    x15 , x15 , 1 
		beq     x15 , x12 , Result 
		jal     x0 , Loop 
Result:
		addi    x2 , x0 , 88 
		bne     x2 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
