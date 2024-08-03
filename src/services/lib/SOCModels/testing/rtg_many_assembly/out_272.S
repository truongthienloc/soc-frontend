.text

#A function power in RISC-V that takes in two numbers x and n, and returns x^n 

Power:
		add     x20 , x0 , x0 	#i
		addi    x19 , x0 , 1 	#Result
		addi    x10 , x0 , 11 	#x
		addi    x30 , x0 , 2 	#n
Loop:
		bge     x20 , x30 , Result 
		slli    x20 , x20 , 3 
		addi    x20 , x20 , 1 
		jal     x0 , Loop
Result:
		addi    x14 , x0 , 121 
		bne     x20 , x14 , Fail 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
