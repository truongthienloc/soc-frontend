.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x13 , x0 , 4 
		add     x19 , x0 , x0 
		add     x5 , x0 , x0 
		addi    x16 , x0 , 48 
InArr:
		addi    x6 , x0 , 32 
		addi    x3 , x0 , 76 
		addi    x24 , x0 , 20 
		addi    x11 , x0 , 64 
		sw      x6 , 68 (x16) 
		sw      x3 , 72 (x16) 
		sw      x24 , 76 (x16) 
		sw      x11 , 80 (x16) 
Loop:
		slli    x2 , x5 , 2 
		add     x31 , x2 , x16 
		lw      x18 , 68 (x31) 
		add     x19 , x19 , x18 
		addi    x5 , x5 , 1 
		beq     x5 , x13 , Result 
		jal     x0 , Loop
Result:
		addi    x8 , x0 , 192 
		bne     x8 , x19 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
