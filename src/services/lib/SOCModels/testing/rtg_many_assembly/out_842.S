.text

#The program checks the ALU instruction in I_type

Main:
		addi    x19 , x0 , 51 
		addi    x30 , x0 , 174 
		addi    x27 , x0 , 0 
		bltu    x19 , x30 , Less_i 
		bgeu    x19 , x30 , Bigger_i 
Less_i:
		addi    x13 , x27 , 133 
		andi    x12 , x27 , 64 
		add     x12 , x12 , x13 
		srli    x12 , x12 , 2 
		addi    x1 , x0 , 33 
		bne     x12 , x1 , Fail 
Bigger_i:
		ori     x13 , x27 , 34 
		xori    x12 , x27 , 149 
		add     x12 , x12 , x13 
		srai    x12 , x12 , 0 
		addi    x1 , x0 , 183 
		bne     x12 , x1 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
