.text

#The program checks the ALU instruction in I_type

Main:
		addi    x6 , x0 , 91 
		addi    x1 , x0 , -2048 
		slti    x19 , x6 , 940 
		bltu    x6 , x1 , Less_i 
		bgeu    x6 , x1 , Bigger_i 
Less_i:
		ori     x17 , x6 , 115 
		sub     x31 , x1 , x6 
		srai    x31 , x31 , 2 
		and     x31 , x31 , x0 
		addi    x25 , x0 , 0 
		beq     x31 , x25 , Pass 
Bigger_i:
		ori     x17 , x6 , 151 
		sub     x31 , x1 , x6 
		srai    x31 , x31 , 4 
		and     x31 , x31 , x0 
		addi    x25 , x0 , 0 
		beq     x31 , x25 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
