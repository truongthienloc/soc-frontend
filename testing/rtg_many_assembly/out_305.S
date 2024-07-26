.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x20 , x0 , 4 
		add     x13 , x0 , x0 
		add     x24 , x0 , x0 
		addi    x30 , x0 , 68 
InArr:
		addi    x28 , x0 , 44 
		addi    x1 , x0 , 52 
		addi    x26 , x0 , 68 
		addi    x27 , x0 , 4 
		sb      x28 , 16 (x30) 
		sb      x1 , 20 (x30) 
		sb      x26 , 24 (x30) 
		sb      x27 , 28 (x30) 
Loop:
		slli    x6 , x24 , 2 
		add     x22 , x6 , x30 
		lb      x11 , 16 (x22) 
		add     x13 , x13 , x11 
		addi    x24 , x24 , 1 
		beq     x24 , x20 , Result 
		jal     x0 , Loop 
Result:
		addi    x31 , x0 , 168 
		bne     x31 , x13 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
