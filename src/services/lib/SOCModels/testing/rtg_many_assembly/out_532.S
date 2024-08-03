.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x24 , x0 , 4 
		add     x28 , x0 , x0 
		add     x23 , x0 , x0 
		addi    x8 , x0 , 12 
		addi    x15 , x0 , 2 
InArr:
		addi    x30 , x0 , 16 
		addi    x4 , x0 , 0 
		addi    x19 , x0 , 0 
		addi    x16 , x0 , 32 
		sb      x30 , 56 (x8) 
		sb      x4 , 60 (x8) 
		sb      x19 , 64 (x8) 
		sb      x16 , 68 (x8) 
Loop:
		sll     x20 , x23 , x15 
		add     x29 , x20 , x8 
		lbu     x1 , 56 (x29) 
		add     x28 , x28 , x1 
		addi    x23 , x23 , 1 
		beq     x23 , x24 , Result 
		jal     x0 , Loop 
Result:
		addi    x14 , x0 , 48 
		bne     x14 , x28 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
