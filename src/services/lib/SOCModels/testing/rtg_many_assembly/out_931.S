.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x17 , x0 , 4 
		add     x5 , x0 , x0 
		add     x15 , x0 , x0 
		addi    x19 , x0 , 68 
		addi    x2 , x0 , 2 
InArr:
		addi    x3 , x0 , 44 
		addi    x4 , x0 , 68 
		addi    x14 , x0 , 36 
		addi    x18 , x0 , 28 
		sh      x3 , 68 (x19) 
		sh      x4 , 72 (x19) 
		sh      x14 , 76 (x19) 
		sh      x18 , 80 (x19) 
Loop:
		sll     x7 , x15 , x2 
		add     x9 , x7 , x19 
		lhu     x24 , 68 (x9) 
		add     x5 , x5 , x24 
		addi    x15 , x15 , 1 
		beq     x15 , x17 , Result 
		jal     x0 , Loop 
Result:
		addi    x12 , x0 , 176 
		bne     x12 , x5 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
