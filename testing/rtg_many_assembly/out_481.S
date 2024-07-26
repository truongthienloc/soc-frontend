.text

#The program checks the ALU instruction in I_type

Main:
		addi    x2 , x0 , 104 
		addi    x10 , x0 , 193 
		addi    x3 , x0 , 63 
		bltu    x2 , x10 , Less_i 
		bgeu    x2 , x10 , Bigger_i 
Less_i:
		addi    x5 , x3 , 151 
		andi    x30 , x3 , 153 
		add     x30 , x30 , x5 
		srli    x30 , x30 , 2 
		addi    x1 , x0 , 59 
		bne     x30 , x1 , Fail 
Bigger_i:
		ori     x5 , x3 , 69 
		xori    x30 , x3 , 44 
		add     x30 , x30 , x5 
		srai    x30 , x30 , 3 
		addi    x1 , x0 , 18 
		bne     x30 , x1 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
