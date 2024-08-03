.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x23 , x0 , 4 
		add     x14 , x0 , x0 
		add     x4 , x0 , x0 
		addi    x2 , x0 , 32 
InArr:
		addi    x7 , x0 , 24 
		addi    x1 , x0 , 40 
		addi    x17 , x0 , 8 
		addi    x10 , x0 , 60 
		sb      x7 , 0 (x2) 
		sb      x1 , 4 (x2) 
		sb      x17 , 8 (x2) 
		sb      x10 , 12 (x2) 
Loop:
		slli    x16 , x4 , 2 
		add     x8 , x16 , x2 
		lb      x28 , 0 (x8) 
		add     x14 , x14 , x28 
		addi    x4 , x4 , 1 
		beq     x4 , x23 , Result 
		jal     x0 , Loop 
Result:
		addi    x24 , x0 , 132 
		bne     x24 , x14 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
