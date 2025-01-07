.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x24 , x0 , 4 
		add     x29 , x0 , x0 
		add     x30 , x0 , x0 
		addi    x8 , x0 , 4 
		addi    x23 , x0 , 2 
InArr:
		addi    x9 , x0 , 40 
		addi    x27 , x0 , 52 
		addi    x19 , x0 , 64 
		addi    x26 , x0 , 28 
		sb      x9 , 24 (x8) 
		sb      x27 , 28 (x8) 
		sb      x19 , 32 (x8) 
		sb      x26 , 36 (x8) 
Loop:
		sll     x16 , x30 , x23 
		add     x5 , x16 , x8 
		lbu     x31 , 24 (x5) 
		add     x29 , x29 , x31 
		addi    x30 , x30 , 1 
		beq     x30 , x24 , Result 
		jal     x0 , Loop 
Result:
		addi    x1 , x0 , 184 
		bne     x1 , x29 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
