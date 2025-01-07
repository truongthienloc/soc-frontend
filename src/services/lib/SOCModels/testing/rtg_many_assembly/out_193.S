.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x25 , x0 , x0 	#i
		addi    x26 , x0 , 1 	#Result
		addi    x23 , x0 , 4 	#x
		addi    x30 , x0 , 1 	#n
Loop:
		bge     x25 , x30 , Result 
		slli    x25 , x25 , 3 
		addi    x25 , x25 , 1 
		jal     x0 , Loop
Result:
		addi    x8 , x0 , 4 
		bne     x25 , x8 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
