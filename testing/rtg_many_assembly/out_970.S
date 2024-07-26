.text

#The program checks the ALU instruction in I_type

Main:
		addi    x15 , x0 , 29 
		addi    x3 , x0 , 97 
		addi    x12 , x0 , 47 
		bltu    x15 , x3 , Less_i 
		bgeu    x15 , x3 , Bigger_i 
Less_i:
		addi    x4 , x12 , 10 
		andi    x2 , x12 , 181 
		add     x2 , x2 , x4 
		srli    x2 , x2 , 2 
		addi    x25 , x0 , 23 
		bne     x2 , x25 , Fail 
Bigger_i:
		ori     x4 , x12 , 127 
		xori    x2 , x12 , 121 
		add     x2 , x2 , x4 
		srai    x2 , x2 , 0 
		addi    x25 , x0 , 213 
		bne     x2 , x25 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
