.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x18 , x0 , 4 
		add     x25 , x0 , x0 
		add     x6 , x0 , x0 
		addi    x15 , x0 , 60 
InArr:
		addi    x24 , x0 , 4 
		addi    x2 , x0 , 8 
		addi    x3 , x0 , 76 
		addi    x31 , x0 , 76 
		sw      x24 , 28 (x15) 
		sw      x2 , 32 (x15) 
		sw      x3 , 36 (x15) 
		sw      x31 , 40 (x15) 
Loop:
		slli    x29 , x6 , 2 
		add     x11 , x29 , x15 
		lw      x22 , 28 (x11) 
		add     x25 , x25 , x22 
		addi    x6 , x6 , 1 
		beq     x6 , x18 , Result 
		jal     x0 , Loop
Result:
		addi    x26 , x0 , 164 
		bne     x26 , x25 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
