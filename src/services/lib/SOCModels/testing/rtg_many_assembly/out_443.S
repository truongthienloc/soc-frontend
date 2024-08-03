.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x14 , x0 , 4 
		add     x30 , x0 , x0 
		add     x23 , x0 , x0 
		addi    x17 , x0 , 44 
		addi    x1 , x0 , 2 
InArr:
		addi    x5 , x0 , 24 
		addi    x9 , x0 , 60 
		addi    x18 , x0 , 52 
		addi    x15 , x0 , 52 
		sb      x5 , 72 (x17) 
		sb      x9 , 76 (x17) 
		sb      x18 , 80 (x17) 
		sb      x15 , 84 (x17) 
Loop:
		sll     x3 , x23 , x1 
		add     x6 , x3 , x17 
		lbu     x16 , 72 (x6) 
		add     x30 , x30 , x16 
		addi    x23 , x23 , 1 
		beq     x23 , x14 , Result 
		jal     x0 , Loop 
Result:
		addi    x19 , x0 , 188 
		bne     x19 , x30 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
