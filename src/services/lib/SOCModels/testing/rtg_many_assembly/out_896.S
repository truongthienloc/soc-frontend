.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x29 , x0 , 4 
		add     x5 , x0 , x0 
		add     x7 , x0 , x0 
		addi    x20 , x0 , 36 
InArr:
		addi    x31 , x0 , 64 
		addi    x24 , x0 , 4 
		addi    x22 , x0 , 4 
		addi    x26 , x0 , 24 
		sb      x31 , 0 (x20) 
		sb      x24 , 4 (x20) 
		sb      x22 , 8 (x20) 
		sb      x26 , 12 (x20) 
Loop:
		slli    x14 , x7 , 2 
		add     x27 , x14 , x20 
		lb      x25 , 0 (x27) 
		add     x5 , x5 , x25 
		addi    x7 , x7 , 1 
		beq     x7 , x29 , Result 
		jal     x0 , Loop 
Result:
		addi    x3 , x0 , 96 
		bne     x3 , x5 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
