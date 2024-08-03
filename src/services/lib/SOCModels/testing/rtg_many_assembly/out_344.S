.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x29 , x0 , 4 
		add     x20 , x0 , x0 
		add     x15 , x0 , x0 
		addi    x25 , x0 , 4 
InArr:
		addi    x21 , x0 , 132 
		addi    x31 , x0 , 64 
		addi    x22 , x0 , 48 
		addi    x6 , x0 , 20 
		sw      x21 , 36 (x25) 
		sw      x31 , 40 (x25) 
		sw      x22 , 44 (x25) 
		sw      x6 , 48 (x25) 
Loop:
		slli    x28 , x15 , 2 
		add     x3 , x28 , x25 
		lw      x10 , 36 (x3) 
		add     x20 , x20 , x10 
		addi    x15 , x15 , 1 
		beq     x15 , x29 , Result 
		jal     x0 , Loop
Result:
		addi    x18 , x0 , 264 
		bne     x18 , x20 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
