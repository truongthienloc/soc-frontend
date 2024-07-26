.text

#The program checks the ALU instruction in I_type

Main:
		addi    x26 , x0 , 107 
		addi    x2 , x0 , 93 
		addi    x22 , x0 , 59 
		bltu    x26 , x2 , Less_i 
		bgeu    x26 , x2 , Bigger_i 
Less_i:
		addi    x19 , x22 , 191 
		andi    x27 , x22 , 127 
		add     x27 , x27 , x19 
		srli    x27 , x27 , 4 
		addi    x10 , x0 , 19 
		bne     x27 , x10 , Fail 
Bigger_i:
		ori     x19 , x22 , 137 
		xori    x27 , x22 , 12 
		add     x27 , x27 , x19 
		srai    x27 , x27 , 2 
		addi    x10 , x0 , 60 
		bne     x27 , x10 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
